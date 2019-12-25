export function joinArrays(array1, array2) {
    return [...new Set([...array1, ...array2])]
}

export function getCombinations(array, k){
    let combinations = [];
    let response = [];

    function run(level, start){

        for(var i=start; i < array.length - k + level + 1; i++){
            combinations[level] = array[i];

            if(level < k - 1){
                run(level + 1, i + 1);
            } else {
                response.push(combinations)
                console.log(combinations)
                // console.log(combinations.join(" "));
            }
        }

    }
    run(0, 0);
    return response;
}
