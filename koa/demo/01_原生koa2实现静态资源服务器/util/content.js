const path=require('path')
const fs=require('fs')

// 封装读取目录内容的方法
const dir=require('./dir')

// 封装读取文件内容的方法
const file=require('./file')

/**
 * 获取静态资源内容
 * @param {object} ctx koa上下文
 * @param {string} 静态资源目录在本地的绝对路径
 * @param {string} 请求获取到的本地内容
 */
async function content(ctx,fullStaticPath){
  // 封装请求资源的完整绝对路径
  let reqPath=path.join(fullStaticPath,ctx.url)

  // 判断请求路径是否为存在的目录或者文件
  let exist=fs.existsSync(reqPath)

  // 返回请求内容，默认为空
  let content=''

  if(!exist){
    // 如果路径不存在
    content='404 Not Found!'
  }else{
    // 判断访问地址是文件夹还是文件
    let stat=fs.statSync(reqPath)

    if(stat.isDirectory()){
      // 如果为目录,则渲染读取内容
      content=dir(ctx.url,reqPath)
    }else{
      // 如果请求为文件，则读取文件内容
      content=await file(reqPath)
    }
  }

  return content
}

module.exports=content
