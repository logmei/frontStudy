// express 采用回调方法的方式，存在异步方法时，执行方式并不是完全的洋葱模式

(async ()=>{ 

  console.log('a'); 

  (async ()=>{ 

      console.log('b'); 

      (async ()=>{ 

          console.log('c'); 

          console.log('d'); 

      })();

      await new Promise((resolve) => setTimeout(() => {console.log(`async end`);resolve()}, 1000));

      console.log('e'); 

  })();

  console.log('f'); 

})();
