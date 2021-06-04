/**
 * 
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4
 * @returns 
 */
var singleNumber = function(nums) {
  debugger
  if(!Array.isArray(nums)) return 
  if(nums.length===0) return
  if(nums.length === 1) return nums[0]
  let val = null
  nums.sort()
  for(let i=0;i<nums.length;i++){
      if(val === null && i === nums.length-1) {
          val= nums[i];
          break
      }
      if(i%2===0 && nums[i]!==nums[i+1]){
          val = nums[i]
          break
      }
  }
  return val
  
};

var singleNumber1 = function(nums) {
  if(!Array.isArray(nums)) return 
  if(nums.length===0) return
  if(nums.length === 1) return nums[0]
  var val = 0
  nums.forEach(v=>{
    val = val ^ v
  })
  return val
  
};
console.log(singleNumber([2,2,1]))
console.log(singleNumber1([2,2,1]))