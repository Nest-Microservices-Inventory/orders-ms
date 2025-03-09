import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    //TODO verificar existencia del usuario
    //TODO verificar que el producto exista
    //TODO verificar el stockc del producto

    //creaccion de la orden
    const order = await this.prisma.order.create({
      data: createOrderDto,
      include: {
        orderDetails: {
          select: {
            productId: true
          }
        }
      }
    })

    return {
      order,
      message: "Orden creada exitosamente"
    }
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        _count: {
          select: {
            orderDetails: true
          }
        },
        orderDetails: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return {
      orders
    }

  }

  async findOne(id: number) {
    
  }

}
