<?php
namespace App\Traits;

trait ProductTraits{

    private function data_validate($request,$id=null)
    {
        $this->validate($request, [
            'title' => 'bail|required|string|max:100',
            'details' => 'required',
            'status' => 'required|numeric',
            'url' => 'required|array|min:1',
            'url.*' => 'required',

        ],
            [
                'product_variant.*.tags.required'=>'The variant tag field is required',
            ]);
    }

}
