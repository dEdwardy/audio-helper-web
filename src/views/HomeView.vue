<template>
  <div class="home-view">
    <div class="first">
      <h3>1.设置升降调参数</h3>
      <div class="info">
        Tips: 升降调可能会导致声音失真，升降的调数越多失真越严重，尽量选择在-5到+5之间保证声音质量。大于+5或者小于-5仅供娱乐
      </div>
      <div class="btns">
        <a-radio-group v-model:value="tone" button-style="solid">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start">
            <a-radio-button v-for="item of 10" :key="'+' + item" :value="item">{{ '+' + item }}半调</a-radio-button>
          </div>
          <div style="display: flex; flex-wrap: wrap;justify-content: flex-start;margin-top:12px">
            <a-radio-button v-for="item of 10" :key="'-' + item" :value="-item">{{ '-' + item }}半调</a-radio-button>
          </div>
        </a-radio-group>
      </div>
    </div>
    <div class="second">
      <h3>2.上传mp3文件</h3>
      <div style="text-align:right;margin-bottom:20px">
        <a-button @click="reset" >清空历史</a-button><br>
      </div>
      <a-spin tip="上传中" :spinning="spinning">
        <a-upload class="avatar-uploader" :data="{ tone }" v-model:file-list="fileList" :before-upload="beforeUpload"
          accept=".mp3" :action="action" @change="handleChange" list-type="picture" style="width:100%">
          <!-- <div class="flex justify-between items-center" style="gap:200px">
            <a-button>
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </div> -->
          <div style="padding:60px 1em;border:1px dashed blue;width:100%">
            <PlusOutlined></PlusOutlined>
            <div class="ant-upload-text">Upload</div>
          </div>
          <template #itemRender="{ file, actions }">
            <div v-if="file.response">
              <div
                style="display: flex;justify-content: space-between;align-items: center;padding:10px 20px;margin-top:12px;border: 1px solid #d9d9d9;">
                <span :style="file.status === 'error' ? 'color: red;flex:1' : 'flex:1'">
                  <span v-if="file.response">{{ file.response.data.name }}</span>
                </span>
                <a v-if="file.response" title="下载" style="width:120px"
                  :href="isProd ? '/download-audio/' + file.response.data.url : '/api/audio/' + file.response.data.url"
                  target="_blank">
                  <download-outlined style="color:#1890ff;font-size:18px" />
                </a>
                <a title="删除" style="width:40px" href="javascript:;" @click="actions.remove">
                  <delete-outlined style="color:#aaa;font-size:18px" />
                </a>
              </div>
              <!-- <Aplayer v-if="file.response" :autoplay="false" showLrc :music="{
                title: file.response.data.name,
                src: isProd ? '/audio/' +file.response.data.url : '/api/audio/'+file.response.data.url,
                artist: '  未知'
              }" /> -->
              <kinesis-container ref="audioRef" v-if="file.response" :audio="'http://localhost:4004/audio/' + file.response.data.url" playAudio>
                <kinesis-audio :audioIndex="10">
                  <kinesis-element :strength="10" type="depth">
                  </kinesis-element>
                </kinesis-audio>
              </kinesis-container>
            </div>
          </template>
        </a-upload>
      </a-spin>
    </div>
  </div>
</template>
<script setup>
import { DownloadOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons-vue";
import { message, Upload } from 'ant-design-vue';
import { ref, onMounted } from "vue";
import { KinesisContainer, KinesisElement, KinesisAudio } from 'vue-kinesis';

const defaultList = localStorage.getItem('mp3') ? JSON.parse(localStorage.getItem('mp3')) : []
const fileList = ref(defaultList ?? []);
const tone = ref(2);
const action = '/api/changeTone'
const spinning = ref(false)
const handleChange = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'uploading') {
    // show loading
    spinning.value = true;
  }
  if (info.file.status === 'done') {
    // close loading
    spinning.value = false;
    console.log(fileList.value)
    // localforage.setItem('mp3',)
    message.success(`${info.file.name} 文件上传成功`);
    localStorage.setItem('mp3', JSON.stringify(fileList.value))
  } else if (info.file.status === 'error') {
    // close loading
    spinning.value = false;
    message.error(`${info.file.name} 文件上传失败！`);
    const idx = fileList.value.findIndex(item => item.uid === info.file.uid);
    fileList.value.splice(idx, 1)
  }
};
const reset = (e) => {
  e.preventDefault()
  localStorage.setItem('mp3', '')
  fileList.value = []
}
const fixIos = () => {
  //获取浏览器的userAgent,并转化为小写
  const ua = navigator.userAgent.toLowerCase();
  //判断是否是苹果手机，是则是true
  const isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);

  // var isWeixin = ua.match(/MicroMessenger/i)=="micromessenger";//微信判断
  // var isQQInstalled = ua.indexOf(' qq')>-1 && ua.indexOf('mqqbrowser') < 0;//qq内置浏览器
  const isQQ = ua.indexOf('mqqbrowser') > -1 && ua.indexOf(" qq") < 0;//qq浏览器
  console.error('fixIos', isIos, isQQ)
  if (isQQ || isIos) {
    var files = document.querySelectorAll("input[type=file]");
    if (files) {
      files.forEach(item => {
        console.error('remove capture')
        item.removeAttribute("capture")
      })
    }
  }
}
onMounted(() => {
  fixIos()
})
const beforeUpload = (file) => {
  console.log(file)
  const isMp3 = file.name.endsWith('.mp3') && file.type.includes('audio')
  if (!isMp3) {
    message.error('只能上传mp3文件!');
  }
  return isMp3 || Upload.LIST_IGNORE
}
</script>
<style lang="scss" scoped>
// ::v-deep(.aplayer-author){
//   display: none;
// }
::v-deep(.aplayer-volume) {
  background: #1890ff !important;
}

::v-deep(.aplayer-played) {
  background: #1890ff !important;
}

.home-view {
  max-width: 1100px;
  margin: 0 auto;
  overflow: hidden;

  :deep(.ant-radio-button-wrapper) {
    width: 84px;
    margin: 2px 4px;
  }

  .first {
    padding: 20px;
    margin: 10px 20px 20px;
    border: 1px solid #d9d9d9;
    text-align: center;

    .info {
      margin: 12px auto 24px;
      font-size: 14px;
      color: #777777;
    }
  }

  .second {
    padding: 20px;
    margin: 10px 20px 20px;
    border: 1px solid #d9d9d9;
    text-align: center;
    min-height: 500px;
  }
}

.w-100 {
  width: 100%;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}
</style>

<style>
.ant-upload.ant-upload-select{
  width:100%;
  cursor: pointer;
}
</style>