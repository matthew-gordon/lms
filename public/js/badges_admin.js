'use strict';

$(document).ready(function() {

// Initialize collapsable menu
$(".button-collapse").sideNav();
// Initialize tooltips
$('.tooltipped').tooltip({delay: 50});

$('.save_button').click(() => {
  console.log($('#student_select'));
});

$.getJSON(`users/current`)
  .done((user) => {
    let $user = $('#user');

    $user.append(
      '<div class="chip">' +
      '<img src="' + user.gh_avatar_url + '">' +
      user.name +
      '</div>'
    );

    let $student = $('#dropdown2');

    $.getJSON('users')
      .done((users) => {
        let students = [];

        for (let i=0;i<users.length;i++) {
          if (users[i].isAdmin === false) {
            students.push(user[i]);
            $student.append(`<li><div id="${users[i].githubId}" class="chip"><img src=${users[i].ghAvatarUrl}">${users[i].name}</div></li>`);

            $(`#${users[i].githubId}`).click(() => {

              let id = users[i].githubId;

              $('.goldLevel').empty();
              $('.silverLevel').empty();
              $('.bronzeLevel').empty();

              $.getJSON(`badges/${id}`)
                .done((userBadges) => {

                  let htmlBadges = [];
                  let jsBadges = [];
                  let dbBadges = [];

                  for (let j=0;j<userBadges.length;j++) {
                    if (userBadges[j].badgeName.includes('HTML')) {
                      htmlBadges.push(userBadges[j]);
                    }

                    if (userBadges[j].badgeName.includes('Javascript')) {
                      jsBadges.push(userBadges[j]);
                    }

                    if (userBadges[j].badgeName.includes('Postgres')) {
                      dbBadges.push(userBadges[j]);
                    }
                  }

                  let trackArray = [htmlBadges, jsBadges, dbBadges];

                  for (let k=0;k<trackArray.length;k++) {
                    let $track;
                    let track;

                    switch(k) {
                      case(0):
                      $track = $('#htmlTrack');
                      track = 'html';
                      break;
                      case(1):
                      $track = $('#jsTrack');
                      track = 'js';
                      break;
                      case(2):
                      $track = $('#dbTrack');
                      track = 'db';
                      break;
                    }

                    for (let i=0; i<trackArray[k].length;i++) {

                      if (trackArray[k][i].badgeComplete === true) {
                        if(trackArray[k][i].badgeTrackPosition < 3 && trackArray[k][i].badgeTrackPosition > 0) {

                          $track.children('.goldLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeCompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        } else if (trackArray[k][i].badgeTrackPosition < 6 && trackArray[k][i].badgeTrackPosition > 2) {

                          $track.children('.silverLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeCompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        } else {

                          $track.children('.bronzeLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeCompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        }

                      } else {

                        if(trackArray[k][i].badgeTrackPosition < 3 && trackArray[k][i].badgeTrackPosition > 0) {
                          $track.children('.goldLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeIncompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        } else if (trackArray[k][i].badgeTrackPosition < 6 && trackArray[k][i].badgeTrackPosition > 2) {

                          $track.children('.silverLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeIncompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        } else {

                          $track.children('.bronzeLevel').append(`<img id="badge${trackArray[k][i].badgeId}" src= "${trackArray[k][i].badgeIncompleteLocation}" class="badgeInactiveSmall tooltipped" data-position="top" data-delay="50" data-tooltip="${trackArray[k][i].badgeName}">`);

                        }

                      }
                      $(`#badge${trackArray[k][i].badgeId}`).tooltip();
                      $(`#badge${trackArray[k][i].badgeId}`).click(() => {

                        if ($(`#badge${trackArray[k][i].badgeId}`).attr('src') === `${trackArray[k][i].badgeIncompleteLocation}`) {

                          $(`#badge${trackArray[k][i].badgeId}`).attr('src', `${trackArray[k][i].badgeCompleteLocation}`);

                        } else if ($(`#badge${trackArray[k][i].badgeId}`).attr('src') === `${trackArray[k][i].badgeCompleteLocation}`) {

                          $(`#badge${trackArray[k][i].badgeId}`).attr('src', `${trackArray[k][i].badgeIncompleteLocation}`);

                        }

                      });
                    }
                }

              })
              .fail(() => {
                Materialize.toast('Unable to retrieve badges', 3000);
              });
            });
          };
        };

      })
      .fail(() => {
        Materialize.toast('Unable to retrieve badges', 3000);
      });

    })
    .fail(() => {
      Materialize.toast('Unable to retrieve badges', 3000);
    });

});
