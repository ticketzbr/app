<?php

namespace HiEvents\Resources\ProductCategory;

use HiEvents\DomainObjects\ProductCategoryDomainObject;
use HiEvents\Resources\Product\ProductResource;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ProductCategoryDomainObject
 */
class ProductCategoryResourcePublic extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'description' => $this->getDescription(),
            'is_hidden' => $this->getIsHidden(),
            'order' => $this->getOrder(),
            $this->mergeWhen((bool)$this->getProducts(), fn() => [
                'products' => ProductResource::collection($this->getProducts()),
            ]),
        ];
    }
}