import { drawCanvas } from '@/utils/canvas'

const shareO = {}

// 会取缓存
async function getImage(currentId = '') {
  if (!currentId) return null

  // 首次初始化
  if (!shareO[currentId]) {
    const dom = document.querySelector(`#${currentId}`)
    if (!dom) return null

    shareO[currentId] = { isComplete: false }
    shareO[currentId].data = await drawCanvas({ selector: `#${currentId}` })
    shareO[currentId].isComplete = true
  }

  // 二次访问未完成结果时，轮训等待
  if (shareO[currentId] && !shareO[currentId].isComplete) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getImage(currentId))
      }, 100)
    })
  }

  return shareO[currentId].data
}

// 总是重新获取
function resetImage(currentId = '') {
  if (!currentId) return null
  // 二次访问未完成结果时，轮训等待
  if (shareO[currentId]) delete shareO[currentId]

  return getImage(currentId)
}

function getImages() {
  return Object.keys(shareO).map(k => shareO[k].data).filter(i => i)
}

export {
  shareO,
  resetImage,
  getImage,
  getImages
}