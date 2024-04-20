document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('mapid').setView([51.505, -0.09], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // 函数来高亮区域
  let lastPolygon;
  function highlightRegion(coordinates) {
    if (lastPolygon) {
      lastPolygon.remove();
    }
    const polygon = L.polygon(coordinates, {color: 'red'}).addTo(map);
    lastPolygon = polygon;
    map.fitBounds(polygon.getBounds());
  }

  // 为所有标记为可点击的图片添加点击事件监听器
  setTimeout(() => { // 延迟确保图片已加载
    const images = document.querySelectorAll('#images-container .clickable-image');
    // console.log("Number of clickable images: ", images.length);
    let lastImage;
    images.forEach((image, index) => {
      image.addEventListener('click', function() {
        // console.log("Clicked image index: ", index);
        const coordinates = image.dataset.coordinates;
        if (coordinates) {
          highlightRegion(JSON.parse(coordinates));
        }
//点击加效果
        const gen = image.dataset.gen;
        if (gen) {
          const genEl = document.querySelector(".family-tree ." + gen);
          if (genEl) {
            genEl.classList.add('gen-animation');
          }
        }
//点击移除上一张图片的效果
        if (lastImage) {
          lastImage.classList.remove('active-animation');
          const gen = lastImage.dataset.gen;
          if (gen) {
            const genEl = document.querySelector(".family-tree ." + gen);
            if (genEl) {
              genEl.classList.remove('gen-animation');
            }
          }
        }
        image.classList.add('active-animation'); // 添加动画类
        lastImage = image;
      });

      // image.addEventListener('transitionend', function() {
      //   image.classList.remove('active-animation'); // 动画完成后移除类
      //   console.log("Animation ended");
      // });
    });
  }, 500);

  // 给族谱的每个人添加事件，用于显示模态框
  const people = document.querySelectorAll('.person');
  const sidebar = document.getElementById('sidebar');
  const sidebarImg = document.getElementById('sidebar-img');

  people.forEach(person => {
    person.addEventListener('mouseenter', function() {
      const src = person.getAttribute('data-img');
      if (src) {
        sidebarImg.src = src;  // 直接使用getAttribute获取的值
        sidebar.classList.add('visible');  // 显示侧边栏
      }
    });
    person.addEventListener('mouseleave', function() {
      sidebar.classList.remove('visible');  // 隐藏侧边栏
    });
  });

});
