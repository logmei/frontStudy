import html2canvas from 'html2canvas'

/**
 * covert canvas to image
 * and save the image file
 */
const canvas2Image = (function () {
  // check if support sth.
  const $support = (function () {
    const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d')

    return {
      canvas: !!ctx,
      imageData: !!ctx.getImageData,
      dataURL: !!canvas.toDataURL,
      btoa: !!window.btoa,
    }
  })()

  const downloadMime = 'image/octet-stream'

  function scaleCanvas(canvas, width, height) {
    const w = canvas.width,
      h = canvas.height
    if (width === undefined) {
      width = w
    }
    if (height === undefined) {
      height = h
    }

    let retCanvas = document.createElement('canvas')
    let retCtx = retCanvas.getContext('2d')
    retCanvas.width = width
    retCanvas.height = height
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height)
    return retCanvas
  }

  function getDataURL(canvas, type, width, height) {
    canvas = scaleCanvas(canvas, width, height)
    return canvas.toDataURL(type)
  }

  // save file to local with file name and file type
  function saveFile(strData, fileType, fileName = 'name') {
    // document.location.href = strData;
    let saveLink = document.createElement('a')
    // download file name
    saveLink.download = fileName + '.' + fileType
    // download file data
    saveLink.href = strData
    // start download
    saveLink.click()
  }

  function genImage(strData) {
    let img = document.createElement('img')
    img.src = strData
    return img
  }

  function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg')
    const r = type.match(/png|jpeg|bmp|gif/)[0]
    return 'image/' + r
  }

  function encodeData(data) {
    if (!window.btoa) {
      // eslint-disable-next-line no-throw-literal
      throw 'btoa undefined'
    }
    let str = ''
    if (typeof data == 'string') {
      str = data
    }
    else {
      for (let i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i])
      }
    }

    return btoa(str)
  }

  function getImageData(canvas) {
    const w = canvas.width,
      h = canvas.height
    return canvas.getContext('2d').getImageData(0, 0, w, h)
  }

  function makeURI(strData, type) {
    return 'data:' + type + ';base64,' + strData
  }

  /**
   * create bitmap image
   * 按照规则生成图片响应头和响应体
   */
  const genBitmapImage = function (oData) {
    //
    // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
    // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
    //

    const biWidth = oData.width
    const biHeight = oData.height
    const biSizeImage = biWidth * biHeight * 3
    const bfSize = biSizeImage + 54 // total header size = 54 bytes

    //
    //  typedef struct tagBITMAPFILEHEADER {
    //  	WORD bfType;
    //  	DWORD bfSize;
    //  	WORD bfReserved1;
    //  	WORD bfReserved2;
    //  	DWORD bfOffBits;
    //  } BITMAPFILEHEADER;
    //
    const BITMAPFILEHEADER = [
      // WORD bfType -- The file type signature; must be "BM"
      0x42,
      0x4d,
      // DWORD bfSize -- The size, in bytes, of the bitmap file
      bfSize & 0xff,
      (bfSize >> 8) & 0xff,
      (bfSize >> 16) & 0xff,
      (bfSize >> 24) & 0xff,
      // WORD bfReserved1 -- Reserved; must be zero
      0,
      0,
      // WORD bfReserved2 -- Reserved; must be zero
      0,
      0,
      // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      54,
      0,
      0,
      0,
    ]

    //
    //  typedef struct tagBITMAPINFOHEADER {
    //  	DWORD biSize;
    //  	LONG  biWidth;
    //  	LONG  biHeight;
    //  	WORD  biPlanes;
    //  	WORD  biBitCount;
    //  	DWORD biCompression;
    //  	DWORD biSizeImage;
    //  	LONG  biXPelsPerMeter;
    //  	LONG  biYPelsPerMeter;
    //  	DWORD biClrUsed;
    //  	DWORD biClrImportant;
    //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
    //
    const BITMAPINFOHEADER = [
      // DWORD biSize -- The number of bytes required by the structure
      40,
      0,
      0,
      0,
      // LONG biWidth -- The width of the bitmap, in pixels
      biWidth & 0xff,
      (biWidth >> 8) & 0xff,
      (biWidth >> 16) & 0xff,
      (biWidth >> 24) & 0xff,
      // LONG biHeight -- The height of the bitmap, in pixels
      biHeight & 0xff,
      (biHeight >> 8) & 0xff,
      (biHeight >> 16) & 0xff,
      (biHeight >> 24) & 0xff,
      // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
      1,
      0,
      // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
      // has a maximum of 2^24 colors (16777216, Truecolor)
      24,
      0,
      // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
      0,
      0,
      0,
      0,
      // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
      biSizeImage & 0xff,
      (biSizeImage >> 8) & 0xff,
      (biSizeImage >> 16) & 0xff,
      (biSizeImage >> 24) & 0xff,
      // LONG biXPelsPerMeter, unused
      0,
      0,
      0,
      0,
      // LONG biYPelsPerMeter, unused
      0,
      0,
      0,
      0,
      // DWORD biClrUsed, the number of color indexes of palette, unused
      0,
      0,
      0,
      0,
      // DWORD biClrImportant, unused
      0,
      0,
      0,
      0,
    ]

    const iPadding = (4 - ((biWidth * 3) % 4)) % 4

    const aImgData = oData.data

    let strPixelData = ''
    const biWidth4 = biWidth << 2
    let y = biHeight
    const fromCharCode = String.fromCharCode

    do {
      const iOffsetY = biWidth4 * (y - 1)
      let strPixelRow = ''
      for (let x = 0; x < biWidth; x++) {
        const iOffsetX = x << 2
        strPixelRow +=
          fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) +
          fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) +
          fromCharCode(aImgData[iOffsetY + iOffsetX])
      }

      for (let c = 0; c < iPadding; c++) {
        strPixelRow += String.fromCharCode(0)
      }

      strPixelData += strPixelRow
    } while (--y)

    return (
      encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) +
      encodeData(strPixelData)
    )
  }

  /**
   * saveAsImage
   * @param canvas canvasElement
   * @param width {String} image type
   * @param height {Number} [optional] png width
   * @param type {string} [optional] png height
   * @param fileName {String} image name
   */
  const saveAsImage = function (canvas, width, height, type, fileName) {
    // save file type
    const fileType = type
    if ($support.canvas && $support.dataURL) {
      if (typeof canvas == 'string') {
        canvas = document.getElementById(canvas)
      }
      if (type === undefined) {
        type = 'png'
      }
      type = fixType(type)
      if (/bmp/.test(type)) {
        const data = getImageData(scaleCanvas(canvas, width, height))
        const strData = genBitmapImage(data)
        // use new parameter: fileType
        saveFile(makeURI(strData, downloadMime), fileType, fileName)
      }
      else {
        const strData = getDataURL(canvas, type, width, height)
        // use new parameter: fileType
        saveFile(strData.replace(type, downloadMime), fileType, fileName)
      }
    }
  }

  const convertToImage = function (canvas, width, height, type) {
    if ($support.canvas && $support.dataURL) {
      if (typeof canvas == 'string') {
        canvas = document.getElementById(canvas)
      }
      if (type === undefined) {
        type = 'png'
      }
      type = fixType(type)

      if (/bmp/.test(type)) {
        const data = getImageData(scaleCanvas(canvas, width, height))
        const strData = genBitmapImage(data)
        return genImage(makeURI(strData, 'image/bmp'))
      }
      else {
        const strData = getDataURL(canvas, type, width, height)
        return genImage(strData)
      }
    }
  }

  return {
    saveAsImage: saveAsImage,
    saveAsPNG: function (canvas, width, height, fileName) {
      return saveAsImage(canvas, width, height, 'png', fileName)
    },
    saveAsJPEG: function (canvas, width, height, fileName) {
      return saveAsImage(canvas, width, height, 'jpeg', fileName)
    },
    saveAsGIF: function (canvas, width, height, fileName) {
      return saveAsImage(canvas, width, height, 'gif', fileName)
    },
    saveAsBMP: function (canvas, width, height, fileName) {
      return saveAsImage(canvas, width, height, 'bmp', fileName)
    },

    convertToImage: convertToImage,
    convertToPNG: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'png')
    },
    convertToJPEG: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'jpeg')
    },
    convertToGIF: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'gif')
    },
    convertToBMP: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'bmp')
    },
  }
})()

/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
  return window.devicePixelRatio && window.devicePixelRatio > 1 ? window.devicePixelRatio : 1
}

/**
 *  将传入值转为整数
 */
function parseValue(value) {
  return parseInt(value, 10)
}

// 返回图片Blob地址
const toBlobURL = (function () {
  const urlMap = {};

  // @param {string} url 传入图片资源地址
  return function (url) {
    // 过滤重复值
    if (urlMap[url]) return Promise.resolve(urlMap[url]);

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img');

      img.src = url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // 关键
        canvas.toBlob((blob) => {
          const blobURL = URL.createObjectURL(blob);
          if (url.length < 50) { urlMap[url] = blobURL }
          resolve(blobURL);
        });
      };
      img.onerror = (e) => {
        reject(e);
      };
    });
  };
}());

// 批量处理
function convertToBlobImage(targetNode, timeout) {
  if (!targetNode) return Promise.resolve();

  let nodeList = targetNode;

  if (targetNode instanceof Element) {
    if (targetNode.tagName.toLowerCase() === 'img') {
      nodeList = [targetNode];
    } else {
      nodeList = targetNode.getElementsByTagName('img');
    }
  } else if (!(nodeList instanceof Array) && !(nodeList instanceof NodeList)) {
    throw new Error('[convertToBlobImage] 必须是Element或NodeList类型');
  }

  if (nodeList.length === 0) return Promise.resolve();

  // 仅考虑<img>
  return new Promise((resolve) => {
    let resolved = false;

    // 超时处理
    if (timeout) {
      setTimeout(() => {
        if (!resolved) resolve();
        resolved = true;
      }, timeout);
    }

    let count = 0;

    // 逐一替换<img>资源地址
    for (let i = 0, len = nodeList.length; i < len; ++i) {
      const v = nodeList[i];
      let p = Promise.resolve();

      if (v.tagName.toLowerCase() === 'img') {
        p = toBlobURL(v.src).then((blob) => {
          v.src = blob;
        });
      }

      p.finally(() => {
        if (++count === nodeList.length && !resolved) resolve();
      });
    }
  });
}

/**
 * 绘制canvas
 */
async function drawCanvas({ selector }) {
  if (!selector) return

  // 获取想要转换的 DOM 节点
  let dom = typeof selector === 'string' ? document.querySelector(selector) : selector
  const rootDom = document.querySelector('#root')
  dom = dom.parentNode.cloneNode(true)
  document.body.insertBefore(dom, rootDom)

  const box = window.getComputedStyle(dom)
  // rootDom.setAttribute('class', 'swiper-no-swiping')
  // 跨域图片需要另行解决
  await convertToBlobImage(dom)
  // DOM 节点计算后宽高
  // const width = parseValue(box.width)
  // const height = parseValue(box.height)
  // 获取像素比
  const scaleBy = 2 || DPR()
  // 创建自定义 canvas 元素
  // const canvas = document.createElement('canvas')
  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  // canvas.width = width * scaleBy
  // canvas.height = height * scaleBy
  // // 设定 canvas css宽高为 DOM 节点宽高
  // canvas.style.width = `${width}px`
  // canvas.style.height = `${height}px`

  // // 获取画笔
  // const context = canvas.getContext('2d')
  //
  // // 将所有绘制内容放大像素比倍
  // context.scale(1 / scaleBy, 1 / scaleBy)

  return await html2canvas(dom, {
    scale: scaleBy,
    // canvas,
    backgroundColor: null,
    logging: true,
    useCORS: true,
    allowTaint: true   // 允许跨域图片污染画布
  }).then(function (canvas) {
    document.body.removeChild(dom)
    return canvas.toDataURL('image/jpeg', .92)
  })
}

export {
  drawCanvas,
  canvas2Image
}