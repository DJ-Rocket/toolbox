<template>
    <div class="px-2">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="select-dir">
            {{ title }}
        </label>

        <div class="inline-flex w-full content-center justify-start mb-4">
            <div class="flex-auto">
                <input class="w-full appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                       id="select-dir" type="text" placeholder="Select Directory" v-model="chosen_dir">
            </div>
            <div class="flex-none">
                <button class="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded"
                        type="button" @click="openDir">
                    <font-awesome-icon icon="folder-open" /> Browse
                </button>
            </div>
        </div>

        <p class="text-red-500 text-xs italic" v-if="error_msg !== ''">
            {{ error_msg }}
        </p>
    </div>
</template>

<script>
  const {dialog} = require('electron').remote
  import {_} from 'vue-underscore'

  export default {
    name: 'OpenDir',
    data: function () {
      return {
        error_msg: '',
        chosen_dir: ''
      }
    },
    props: {
      title: String,
    },
    methods: {
      openDir: function () {
        dialog.showOpenDialog({
          properties: ['openDirectory', 'createDirectory']
        }).then(result => {
          if (!result.canceled) {
            this.chosen_dir = _.first(result.filePaths)
            this.$emit('changed-directory', this.chosen_dir)
          }
        }).catch(err => {
          this.error_msg = err.message()
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
