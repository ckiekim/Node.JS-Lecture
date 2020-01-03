try {
    let a = new Array(-10);
} catch (exception) {
    console.log(exception.name);
    console.log(exception.message);
} finally {
    console.log('This is finally.');
}
