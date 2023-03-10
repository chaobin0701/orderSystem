import defaultImg from "@/public/images/defaultFood.png";
// 指令
export default app => {
  // 图片懒加载指令
  app.directive("lazyload", {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            observer.unobserve(el);
            console.log(`output->el`, el);
            el.onerror = () => {
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0.01
        }
      );
      observer.observe(el);
    }
  });
};
