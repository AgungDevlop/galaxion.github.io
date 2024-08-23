const apiUrl = 'https://raw.githubusercontent.com/AgungDevlop/Viral/main/Video.json';
const randomUrls = [
    'https://kaulopsaukie.net/4/7830856',
    'https://so-gr3at3.com/go/1239096',
    'https://revoiceaguglia.com/i1zaGFBOGY5m/94691',
    'https://meowadvertising.com/ra4vuurg4u?key=a25903f2571d21a897e3d243d11b3029',
    'https://acceptablereality.com/bI3.V/0PP/3PpjvqbvmmVPJMZMDd0J0bO-DyQYzFOyDGMc3/LhTsQB4/NtDQM/4EMZz_go'
];

const videoUrl = sessionStorage.getItem('videoUrl');
const videoTitle = sessionStorage.getItem('videoTitle');
if (videoUrl) {
    const videoPlayer = document.getElementById('playVideo');
    videoPlayer.src = videoUrl;

    videoPlayer.addEventListener('loadedmetadata', function () {
        videoPlayer.play();
    });

    videoPlayer.addEventListener('error', function () {
        document.getElementById('errorMessage').classList.remove('hidden');
        videoPlayer.classList.add('hidden');
    });

    document.getElementById('videoTitle').innerText = videoTitle;
} else {
    console.error('No video URL found in sessionStorage');
}

fetch(apiUrl)
    .then(response => response.json())
    .then(videos => {
        processVideoFromRandomId(videos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function processVideoFromRandomId(videos) {
    const randomId = getRandomIdFromUrl();
    const mainElement = document.querySelector('main.container');

    if (randomId) {
        const video = videos.find(video => video.id === randomId);

        if (video) {
            const titleElement = document.getElementById('videoTitle');
            titleElement.innerText = video.Judul;

            const videoPlayer = document.getElementById('video-id');
            const sourceElement = document.getElementById('playVideo');
            sourceElement.src = video.Url;

            const currentDomain = window.location.origin;
            const urlInput = document.getElementById('videoUrl');
            urlInput.value = `${currentDomain}/#/${video.id}`;

            const downloadButton = document.getElementById('downloadButton');
            downloadButton.onclick = function () {
                sessionStorage.setItem('dwn', video.Url);
                const downloadWindow = window.open('/download.html', '_blank'); // Open download.html in a new tab
                
                setTimeout(() => {
                    const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
                    window.location.href = randomUrl; // Redirect current tab to a random URL after 3 seconds
                }, 3000);
            };

            const shareButton = document.getElementById('shareButton');
            shareButton.onclick = function () {
                const shareData = {
                    title: video.Judul,
                    text: `Tonton video viral ${video.Judul} terbaru`,
                    url: urlInput.value
                };

                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil Membagikan!',
                                text: 'Link telah dibagikan ke aplikasi sosial.',
                                confirmButtonText: 'OK'
                            });
                        })
                        .catch((error) => {
                            console.error('Error sharing:', error);
                        });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Berbagi tidak didukung',
                        text: 'Fitur berbagi tidak didukung di browser ini.',
                        confirmButtonText: 'OK'
                    });
                }
            };

            videoPlayer.load();
            videoPlayer.play();
        } else {
            console.error('Video not found for the given randomId.');
            mainElement.style.display = 'none';
            Swal.fire({
                icon: 'warning',
                title: 'Video Sudah Di Hapus Oleh Uploader',
                text: 'Video yang Anda cari tidak ditemukan.',
                confirmButtonText: 'OK'
            });
        }
    } else {
        console.error('Random ID not found in URL.');
        mainElement.style.display = 'none';
    }
}

function getRandomIdFromUrl() {
    const hash = window.location.hash;
    return hash.startsWith('#/') ? hash.substring(2) : null;
}

const currentYear = new Date().getFullYear();
document.getElementById('copyrightText').innerText = `©Copyright By Simontok Indo ${currentYear}`;
