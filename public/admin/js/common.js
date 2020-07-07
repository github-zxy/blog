function serializeToJson(form) {
    //创建空对象
    var result = {}
    var f = form.serializeArray()
    f.forEach(function (item) {
        //result.email
        result[item.name] = item.value
    })
    return result;
}