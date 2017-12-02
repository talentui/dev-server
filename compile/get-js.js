module.exports = function(chunks){
    return chunks.filter(item => item.files.length).map(item => item.files[0]);
}