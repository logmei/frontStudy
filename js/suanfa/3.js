/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

 

示例 1：

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
示例 2：

输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  if(n===0) return nums1
  if(m===0) return nums2
  
  for(let i=0;i<n;i++){
      move(nums1,nums2[i],m)
      m++
  }
  return nums1
};

var move = function(arr,newV,m){
  let mid = m-1
  if(newV>=arr[mid]){
      arr[m]=newV
  }
  for(let i =m-1;i>=0;i--){
      if(newV<arr[i]){
          arr[i+1]=arr[i]
          arr[i] = newV
      } else {
          break
      }
  }
}

const nums1 = [0], m = 0, nums2 = [1], n = 1
console.log(merge(nums1,m,nums2,n))

var merge2 = function(nums1, m, nums2, n) {
 let i = m-1;
 let j = n-1;
 let end = m+n-1;
 while(j>=0){
   nums1[end--] = (i>=0 && nums1[i]>nums2[j])?nums1[i--]:nums2[j--]
 }
return nums1
};
console.log(merge2(nums1,m,nums2,n))