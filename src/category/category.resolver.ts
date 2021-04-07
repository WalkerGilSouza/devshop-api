import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryMapper } from './category.mapper'
import { CategoryService } from './category.service'
import { CategoryPublic } from './dto/category'
import { CategoryCreateInput } from './dto/category-create.input'

@Resolver(of => CategoryPublic)
export class CateroryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(returns => [CategoryPublic], { name: 'getAllCategories'})
  async getAllCategories(): Promise<CategoryPublic[]>{
    return await this.categoryService.findAll()
  }

  @Mutation(returns => CategoryPublic, { name: 'createCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic>{
    
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }
}