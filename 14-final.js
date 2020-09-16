function getUserById(id) {
  const params = {
    access_token: "place here your vkapp token",
    user_ids: id,
    fields: "photo_big",
  };

  return $.ajax({
    url: "https://api.vk.com/method/users.get?v=5.52&" + $.param(params),
    type: "GET",
    dataType: "JSONP",
  }).promise();
}

rxjs
  .fromEvent($("#practiceInput"), "keyup")
  .pipe(
    rxjs.operators.pluck("target", "value"),
    rxjs.operators.distinct(),
    rxjs.operators.debounceTime(2000),
    rxjs.operators.mergeMap((v) => rxjs.from(getUserById(v))),
    rxjs.operators.catchError((err) => rxjs.of(err)),
    rxjs.operators.map((x) => x.response[0])
  )
  .subscribe(
    (user) => {
      $("#practiceText").html(
        `${user.first_name} ${user.last_name} <i>${user.id}</i>`
      );
      $("#practicePic").attr("src", user.photo_big);
      console.log(user);
    },
    (err) => console.log(err),
    () => console.log("Completed")
  );
