import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";
import * as less from "gulp-less";

let browserSync = require('browser-sync').create();
let reload      = browserSync.reload;

gulp.task("compile-c", async () => {
  const data = await Service.compileFile(project.getFile("src/main.c"), "c", "wasm", "-g -O3");
  const outWasm = project.newFile("docs/out/main.wasm", "wasm", true);
  outWasm.setData(data);
});

gulp.task("watch-c", async () => {
  gulp.watch("./src/**/*.c", ["compile-c"]);
})

gulp.task("compile-less", function() {  
  gulp.src('./src/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./docs/css/'));
}); 

gulp.task("watch-less", function() {  
  gulp.watch('./src/**/*.less' , ['compile-less']);
});

gulp.task("serve", function () {
  browserSync.init({
    server: {
        baseDir: "./docs/"
    }
  }); 
  gulp.watch("./src/*.less").on("change", reload);
  gulp.watch("./src/*.c").on("change", reload);
  gulp.watch("./docs/*.html").on("change", reload);
  gulp.watch("./docs/*.js").on("change", reload);
})

gulp.task("default", ["watch-less", "watch-c", "serve"], async () => {});
