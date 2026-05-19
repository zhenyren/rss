use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ApiRequest {}

#[derive(Serialize)]
struct ApiResponse {
    message: String,
    success: bool,
}

async fn index() -> impl Responder {
    HttpResponse::Ok().body("✅ Node + Rust 后台运行中")
}

async fn handle_api(_req: web::Json<ApiRequest>) -> impl Responder {
    HttpResponse::Ok().json(ApiResponse {
        message: "API 请求成功".to_string(),
        success: true,
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🚀 服务已启动: http://localhost:3000");
    
    HttpServer::new(|| {
        App::new()
            .wrap(actix_web::middleware::Logger::default())
            .route("/", web::get().to(index))
            .route("/", web::post().to(handle_api))
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}
