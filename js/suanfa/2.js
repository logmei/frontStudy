
/**编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 

示例 1：


输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
示例 2：


输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
 

提示：

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-109 <= matix[i][j] <= 109
每行的所有元素从左到右升序排列
每列的所有元素从上到下升序排列
-109 <= target <= 109

 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  const m = matrix.length
  const n = matrix[0].length
  for(let i=0;i<m;i++){
    if(matrix[i][n-1]===target) return true
    if(matrix[i][n-1]>target){
      const res = SecondSearch(matrix[i],0,n-1,target)
      if(res!==null) return true
    }
     
  }
  return false
};

var SecondSearch = function(arr,start,end,target){
  if(start===end){
      return arr[start]===target?target:null
  }
  const len = end-start+1
  if(len===2){
    if(arr[start]===target) return arr[start]
    if(arr[end] === target) return arr[end]
    return null
  }
   const mid = Math.floor(len/2)+start
  if(target===arr[mid]) return arr[mid]
  if(target<arr[mid]) return SecondSearch(arr,start,mid-1,target)
  if(target>arr[mid]) return SecondSearch(arr,mid+1,end,target)
  return null
}
const matrix = [[3,5,9,9,9,11],[5,8,13,13,16,17],[10,10,14,14,16,19],[15,18,20,24,26,26],[20,24,29,32,37,41]]

const target = 32

console.log(searchMatrix(matrix,target))