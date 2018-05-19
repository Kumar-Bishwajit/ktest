// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Baromas",
                "length": "4:51",
                "file": "s (1)"
            }, {
                "track": 2,
                "name": "Gonotantro",
                "length": "3:57",
                "file": "s (2)"
            }, {
                "track": 3,
                "name": "Hoyto Tomar Kachey",
                "length": "5:40",
                "file": "s (3)"
            }, {
                "track": 4,
                "name": "Jodi Sukhi Hote Chao",
                "length": "4:03",
                "file": "s (4)"
            }, {
                "track": 5,
                "name": " Kagojer Phul ",
                "length": "3:54",
                "file": "s (5)"
            }, {
                "track": 6,
                "name": "Kagojer Phul",
                "length": "3:56",
                "file": "s (6)"
            }, {
                "track": 7,
                "name": "Lal Orna",
                "length": "4:38",
                "file": "s (7)"
            }, {
                "track": 8,
                "name": "Na Bolbona",
                "length": "5:07",
                "file": "s (8)"
            }, {
                "track": 9,
                "name": "Parena Bachate",
                "length": "4:58",
                "file": "s (9)"
            }, {
                "track": 10,
                "name": " prem Chara ",
                "length": "5:00",
                "file": "s (10)"
            }, {
                "track": 11,
                "name": "Prohori",
                "length": "4:41",
                "file": "s (11)"
            }, {
                "track": 12,
                "name": "Tulonahina",
                "length": "5:08",
                "file": "s (12)"
            }, {
                "track": 13,
                "name": " Tulonahina Tumi ",
                "length": "5:10",
                "file": "s (13)"
            }, {
                "track": 14,
                "name": " Tumi Chara ",
                "length": "4:19",
                "file": "s (14)"
            }, {
                "track": 15,
                "name": "Tumi Echchey Hole",
                "length": "4:36",
                "file": "s (15)"
            }, {
                "track": 16,
                "name": "Tumi Eschey Hole",
                "length": "4:34",
                "file": "s (16)"
            }, {
                "track": 17,
                "name": "Valobasar Mulla",
                "length": "3:59",
                "file": "s (17)"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});