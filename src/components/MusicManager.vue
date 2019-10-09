<template>
    <div id="music-manager" class="container mx-auto">
        <div class="flex mb-4 -mx-2">
            <div class="w-1/2">
                <open-dir title="From Dir" @changed-directory="openFromDir"/>
            </div>
            <div class="w-1/2">
                <open-dir title="To Dir" @changed-directory="openFromDir"/>
            </div>
        </div>

        {{ from_dir }}

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

  export default {
    name: 'MusicManager',
    components: {
      OpenDir
    },
    data: function () {
      return {
        from_dir: 'Test',
        files: [
          {name: 'Sample File.mp3', full_path: '/Music'},
          {name: 'Sample File 2.mp3', full_path: '/Music'},
          {name: 'Sample File 3.mp3', full_path: '/Music'},
        ]
      }
    },
    methods: {
      openFromDir: function (directory) {
        this.from_dir = directory
      }
    }
  }


</script>

<style scoped>

</style>
