import { AppService } from './app.service';
import { Action, InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { CitiesService } from "./cities/cities.service";
import * as process from "process";
import { ProductsService } from "./products/products.service";

@Update()
export class AppUpdate {
  constructor(
    private readonly appService: AppService,
    private readonly citiesService: CitiesService,
    private readonly productsService: ProductsService,
    @InjectBot() private readonly bot: Telegraf<Context>
  ) {

  }

  getMainMenuButton() {
    return [{ text: 'Menu 🔙', callback_data: 'menu' }]
  }

  getMappedStructureForMarkup(data: Array<any>) {
    return data.map((el) => [el])
  }

  async sellProduct(mappedProducts: Array<any>, ctx:Context) {
    if (mappedProducts.length) {
      await ctx.reply('Выберите товар', {
        reply_markup: {
          inline_keyboard: [...mappedProducts, this.getMainMenuButton()]
        }
      })

      mappedProducts.forEach(product => {
        const productCallbackData = product[0].callback_data;
        console.log(product);

        this.bot.action(productCallbackData, async (ctx) => {
          await ctx.reply(`Оплатите ${ product[0].price } ETH на адрес ${ process.env.ETH_ADDRESS }
после оплаты нажмите кнопку оплатил`, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Оплачено',
                    callback_data: `payed${product[0].id}`
                  }
                ]
              ]
            }
          })
        })

        const photos = product[0].photoUrl.split(' ');

        this.bot.action(`payed${product[0].id}`, (ctx) => {
          photos.forEach((photoUrl, idx) => {
            ctx.replyWithPhoto({url: photoUrl}, {caption: 'Фото #' + (idx + 1)});
          });
          this.productsService.remove(product[0].id);
        })
      })

    } else {
      await ctx.reply('В этом месте пока нет товара :(', {
        reply_markup: {
          inline_keyboard: [this.getMainMenuButton()]
        }
      })
    }
  }

  @Start()
  async startCommand(ctx: Context) {
    const cities = await this.citiesService.findAll();
    const mappedCities = this.getMappedStructureForMarkup(cities);

    await ctx.reply('Выберите город', {
      reply_markup: {
        inline_keyboard: [...mappedCities]
      }
    })

    mappedCities.forEach((city) => {
      const cityCallbackData = city[0].callback_data;

      this.bot.action(cityCallbackData, async (ctx) => {
        const mappedAreas = this.getMappedStructureForMarkup(city[0].areas);

        if (mappedAreas.length === 1) {
          const mappedProducts = city[0].areas[0].products.map((product) => {
            return [{ ...product, callback_data: product.text + product.id, text: product.text + ' ' + product.price + 'ETH' }]
          })

          this.sellProduct(mappedProducts, ctx);
        }

        if (mappedAreas.length > 1) {
          await ctx.reply('Выберите район', {
            reply_markup: {
              inline_keyboard: [...mappedAreas, this.getMainMenuButton()]
            }
          })

          mappedAreas.forEach(area => {
            const areaCallbackData = area[0].callback_data;

            this.bot.action(areaCallbackData, async (ctx) => {
              const mappedProducts = area[0].products.map((product) => {
                return [{ ...product, callback_data: product.text + product.id, text: product.text + ' ' + product.price + 'zł' + ' ' + product.weight }]
              })

              this.sellProduct(mappedProducts, ctx)
            });
          })
        }
      })
    });
  }
}
