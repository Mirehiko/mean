// function getUserById(id) {
//     const params = {
//         access_token: '396e766f010ac5ba9eea7589c45366e9ed4099132313ca5a9af4be6fe26207259fbc9d4df9b5debc2197a',
//         user_ids: id,
//     };

//     return $.ajax({
//         url: 'https://api.vk.com/method/friends.getOnline?v=5.52&access_token=' + $.param(params),
//         type: 'GET',
//         dataType: 'JSONP'
//     }).promise();
// }

function getUserById(id) {
  const params = {
    access_token:
      "place here your vkapp token",
    user_ids: id,
    fields: "photo_big",
  };

  return $.ajax({
    url: "https://api.vk.com/method/users.get?v=5.52&" + $.param(params),
    type: "GET",
    dataType: "JSONP",
  }).promise();
}

rxjs.fromEvent($("#practiceInput"), "keyup")
  .pipe(
    rxjs.operators.pluck('target', 'value'),
    rxjs.operators.distinct(),
    rxjs.operators.debounceTime(2000),
    rxjs.operators.mergeMap(v => rxjs.from(getUserById(v))),
    rxjs.operators.catchError(err => rxjs.of(err)),
    rxjs.operators.map(x => x.response[0]),
  )
  .subscribe((user) => {
      $('#practiceText').html(`${user.first_name} ${user.last_name} <i>${user.id}</i>`);
      $('#practicePic').attr('src', user.photo_big);
      console.log(user)
    }, 
    err => console.log(err),
    () => console.log('Completed')
  );
