// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;
use tauri_plugin_log::{log, Target, TargetKind};

use crate::commands::{
    close_message_assistant_card_window, hide_message_assistant_card_window, log,
    open_message_assistant_card_window,
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                // 1. 定义日志输出到哪里
                .targets([
                    Target::new(TargetKind::Stdout), // 输出到命令行终端（开发时看）
                    Target::new(TargetKind::LogDir {
                        file_name: Some("log.txt".to_string()),
                    }), // 输出到本地系统日志文件夹（生产环境看）
                    Target::new(TargetKind::Webview), // 回传给前端控制台（可选）
                ])
                // 2. 定义日志级别，这里过滤掉一些无用的底层系统日志，只看主要日志
                .level(log::LevelFilter::Info)
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build()) // 注册
        .invoke_handler(tauri::generate_handler![
            greet,
            log,
            open_message_assistant_card_window,
            close_message_assistant_card_window,
            hide_message_assistant_card_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
