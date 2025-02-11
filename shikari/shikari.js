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
                "name": "Je Shikari",
                "length": "4:43",
                "file": "s (1)"
            }, {
                "track": 2,
                "name": "Boshonto Chuyeche",
                "length": "4:05",
                "file": "s (2)"
            }, {
                "track": 3,
                "name": "Tomar Shithir Moto",
                "length": "4:33",
                "file": "s (3)"
            }, {
                "track": 4,
                "name": "Ami Nirbashone Jabo Na",
                "length": "4:04",
                "file": "s (4)"
            }, {
                "track": 5,
                "name": " Je Betha Dia Gele Upohar ",
                "length": "4:25",
                "file": "s (5)"
            }, {
                "track": 6,
                "name": "Jormoile Morite Hoibe",
                "length": "4:19",
                "file": "s (6)"
            }, {
                "track": 7,
                "name": "Ami Bhalo Thakar Kotha Shune",
                "length": "4:05",
                "file": "s (7)"
            }, {
                "track": 8,
                "name": " Amar Chokher Dekha Bhul Holo",
                "length": "4:00",
                "file": "s (8)"
            }, {
                "track": 9,
                "name": "Tumi Roj Bikele",
                "length": "4:23",
                "file": "s (9)"
            }, {
                "track": 10,
                "name": " Ek Poshla Brishti Te ",
                "length": "4:19",
                "file": "s (10)"
            }, {
                "track": 11,
                "name": "Chondona Go ",
                "length": "4:02",
                "file": "s (11)"
            }, {
                "track": 12,
                "name": "O Docktar ",
                "length": "4:59",
                "file": "s (12)"
            }, {
                "track": 13,
                "name": " Prohori ",
                "length": "4:09",
                "file": "s (13)"
            }, {
                "track": 14,
                "name": " Ektara Bajaio Na ",
                "length": "4:10",
                "file": "s (14)"
            }, {
                "track": 15,
                "name": "Prem To Chorer Jomi Noy ",
                "length": "4:36",
                "file": "s (15)"
            }, {
                "track": 16,
                "name": " Kotha Tomar Jonne Ei Nirobota ",
                "length": "4:36",
                "file": "s (16)"
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