let data;
let elList;

const getPosts = async () => {
  await axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
    const table = document.querySelector(".table");

    res.data.forEach((i, idx) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("tableEl");
      imgDiv.style.border = "1px solid #efefef";
      imgDiv.style.height = "calc(10% - 2px)";

      imgDiv.elems_index = idx;

      table.appendChild(imgDiv);
    });
    data = res.data;
  });

  elList = document.querySelectorAll(".tableEl");

  elList.forEach((elem, index) => {
    elem.elems_index = index;
    io.observe(elem);
  });
  //   addEventToEl(elList);
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const idx = entry.target.elems_index;

          const imgTag = document.createElement("img");
          imgTag.style.width = "100%";
          imgTag.style.height = "100%";
          imgTag.style.objectFit = "cover";
          imgTag.src = data[idx].url;

          entry.target.appendChild(imgTag);
        }, 500);
      }
    });
  },
  {
    threshold: 1,
  }
);

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const addEventToEl = (elList) => {
  document.querySelector(".table").addEventListener("scroll", () => {
    elList.forEach((el) => {
      if (isElementInViewport(el)) {
        setTimeout(() => {
          const idx = el.elems_index;
          const imgTag = document.createElement("img");
          imgTag.style.width = "100%";
          imgTag.style.height = "100%";
          imgTag.style.objectFit = "cover";
          imgTag.src = data[idx].url;

          el.appendChild(imgTag);
        }, 500);
      }
    });
  });
};

getPosts();
