function twoSum(nums, target) {
  for(let i = 0; i < nums.length; i++){
    let num = nums[i]
    const difference = target - num;
    const id = nums.indexOf(difference)
    if(id < 0) continue;

    return new Set(id, num)
  }
}


console.log(twoSum([2,7,11,15], 9));
