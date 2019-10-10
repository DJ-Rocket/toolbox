<template>
    <div id="music-manager" class="container mx-auto">
        <div class="bg-white border-transparent rounded-lg shadow-lg mb-4">
            <div class="bg-gray-400 uppercase text-gray-800 border-b-2 border-gray-500 rounded-tl-lg rounded-tr-lg p-2">
                <h5 class="font-bold uppercase text-gray-600 text-sm">Filters</h5>
            </div>
            <div class="p-5">
                <div class="flex mb-4 -mx-2">
                    <div class="w-1/2">
                        <open-dir title="From Dir" @changed-directory="openFromDir"/>
                    </div>
                    <div class="w-1/2">
                        <open-dir title="To Dir" @changed-directory="openFromDir"/>
                    </div>
                </div>
                <div class="flex mb-4 -mx-2">
                    <div class="flex-auto px-2">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                               for="filter-text">
                            Filter
                        </label>
                        <div class="flex-auto">
                            <input class="w-full appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                   id="filter-text" type="text" placeholder="Text to filter" v-model="filter_text">
                        </div>

                        <label class="block uppercase tracking-wide text-gray-700 text-xs mt-2 text-left">
                            <input type="checkbox" id="filter-regexp" v-model="filter_regexp"> RegExp
                        </label>
                    </div>

                    <div class="flex-auto px-2">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                               for="filter-extension">
                            Extension
                        </label>
                        <div class="flex-auto">
                            <input class="w-full appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                   id="filter-extension" type="text" placeholder="Extension" v-model="filter_extension">
                        </div>
                    </div>

                    <div class="flex-auto px-2 items-center content-center">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
                            Others
                        </label>
                        <label class="block uppercase tracking-wide text-gray-700 text-xs mb-2 text-left">
                            <input type="checkbox" id="filter-music-files" v-model="filter_music_files"> Only Music
                            Files
                        </label>
                        <label class="block uppercase tracking-wide text-gray-700 text-xs mb-2 text-left">
                            <input type="checkbox" id="filter-known-artist" v-model="filter_known_artists"> Only known
                            artists
                        </label>
                    </div>
                </div>
                <div class="flex mb-4 -mx-2 justify-end">
                    <button class="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded"
                            type="button" @click="findItems">
                        <font-awesome-icon icon="search"/>
                        Find
                    </button>
                    <button class="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded ml-2"
                            type="button" @click="findItems" disabled>
                        <font-awesome-icon icon="play-circle"/>
                        Move Files
                    </button>
                </div>
            </div>
        </div>


        <datatable :columns="columns" :data="files" class="bg-gray-400 w-full"></datatable>

        <div class="table w-full" id="file-list">
            <div class="table-row">
                <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">Select</div>
                <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">File</div>
                <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">Full path</div>
                <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">Actions</div>
            </div>
            <div class="table-row" v-for="file in files" v-bind:key="file.name">
                <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm"></div>
                <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm">{{ file.name }}</div>
                <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm">{{ file.full_path }}</div>
                <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import OpenDir from './FS/OpenDir.vue'
  import {_} from 'vue-underscore'

  export default {
    name: 'MusicManager',
    components: {
      OpenDir
    },
    data: function () {
      return {
        columns: [
          //{label: 'Select', field: 'id'},
          {label: 'File', field: 'name', headerClass: 'bg-gray-800'},
          {label: 'Full Path', field: 'full_path'},
        ],
        filter_extension: '',
        filter_known_artists: '',
        filter_music_files: '',
        filter_regexp: '',
        filter_text: '',
        from_dir: '',
        files: [
          {name: 'Sample File.mp3', full_path: '/Music'},
          {name: 'Sample File 2.mp3', full_path: '/Music'},
          {name: 'Sample File 3 .mp3', full_path: '/Music'},
        ]
      }
    },
    methods: {
      findItems: function () {
        const fs = require('fs')
        const path = require('path')
        console.log('Scanning Dir ' + this.from_dir)

        const dirents = fs.readdirSync(this.from_dir, { withFileTypes: true });
        const filesNames = dirents
          .filter(dirent => !dirent.isDirectory())
          .map(dirent => dirent.name);

        this.files = []

        _.each(filesNames, function (file) {
          this.files.push({name: file, full_path: path.join(this.from_dir, file)})
        }, this)

        console.log(filesNames);

        /*
        fs.readdir(this.from_dir, (err, files) => {
          // On error, show it and return
          if (err) return console.error(err)

          // files is an array containing the names of all entries
          // in the directory, excluding '.' (the directory itself)
          // and '..' (the parent directory).


          // Display directory entries
          _.each(files, function (file) {
            this.files.push({name: file, full_path: path.join(this.from_dir, file)})
          }, this)

          console.log(files)
        })
         */
      },
      openFromDir: function (directory) {
        this.from_dir = directory
      }
    }
  }


</script>

<style scoped>

</style>
