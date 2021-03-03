
<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Product List</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#ProductCRUD" >Add New <i class="fas fa-plus"></i></button>
                        </div>
                    </div>

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Imaage</th>
                                <th>Registered At</th>
                                <th>Modify</th>
                            </tr>
                            <tr>
                                <td>dsds</td>
                                <td>dsds</td>
                                <td>dsds</td>
                                <td>dsds</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card-footer">

                    </div>
                </div>

            </div>
        </div>


<!--    modal-->

        <div class="modal fade" id="ProductCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="addProduct()" @keydown="form.onKeydown($event)">

                    <div class="modal-body">
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Title:</label>
                                <input v-model="form.title" type="text" name="title"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('title') }">
                                <has-error :form="form" field="title"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Details:</label>
                                <input v-model="form.details" type="text" name="details"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('details') }">
                                <has-error :form="form" field="details"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Status:</label>
                                <select  v-model="form.status" type="text" name="status"
                                         class="form-control" :class="{ 'is-invalid': form.errors.has('status') }">
                                    <option value="1">sdfsd</option>
                                </select>
                                <has-error :form="form" field="status"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Image:</label>
                                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="uploadImage" @vdropzone-removed-file="removeImage"></vue-dropzone>

                            </div>
                         </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button :disabled="form.busy" type="submit" class="btn btn-primary">Add</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// vue2 dropzone
import vue2Dropzone from 'vue2-dropzone';
export default {
    data(){
      return {
          products:[],
          images:[],
          form: new Form({
              id: '',
              title: '',
              details: '',
              status:1,
              url:'',
          }),
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 215,
              maxFilesize: 0.5,
              acceptedFiles: '.jpg, .jpeg, .png .gif',
              addRemoveLinks: true,
              dictDefaultMessage: "<i class='fas fa-cloud-upload-alt fa-5x'></i>",
              headers: {
                  "My-Awesome-Header": "header value",
                  "X-CSRF-TOKEN": document.head.querySelector("[name=csrf-token]").content
              }
          }
      }

    },
    components: {
        vueDropzone: vue2Dropzone,
    },
    methods:{
        addProduct(){
            this.form.post('api/products')
                .then((data ) => { console.log(data) })
        },
        uploadImage(file){
            let image=file.dataURL;
            this.images.push(image);
            iziToast.success({
                title: 'Success',
                message: "Image upload success",
            });
            console.log(image);
        },
        removeImage(file){
            let image=file.dataURL;
            this.images.pop(image);
            console.log(image);
        },
    },
    watch: {
        images: function(val) {
            this.form.fill(this.images);
        }
    },
}
</script>
