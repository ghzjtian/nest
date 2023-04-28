import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  // @UseFilters(new HttpExceptionFilter())   // 用 HttpExceptionFilter 去返回自定义的错误信息.
  async findAll(): Promise<Cat[]> {
    console.log("findAll");
    // await this.delay(6000);
    return this.catsService.findAll();
    // throw new HttpException('custom message 222', HttpStatus.BAD_REQUEST, {
    //   cause: new Error('Cause Error'),
    //  });
  }

  /**
   * 使用了管道 pipe, 管道可以把传过来的参数转化为指定的数据类型. 或者验证
   * @param id 
   */
  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    console.log(id);
    // return {id};
    // get by ID logic
  }

  private delay(msSeconds = 1000): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, msSeconds));
  }
}
