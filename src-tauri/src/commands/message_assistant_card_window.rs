use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};

// 统一定义一个常量，防止手抖打错
const CARD_LABEL: &str = "message_assistant_card";

// 卡片窗口操作
#[tauri::command]
pub fn open_message_assistant_card_window(app_handle: AppHandle) {
    // 检查卡片窗口是否已经存在
    if let Some(card_window) = app_handle.get_webview_window(CARD_LABEL) {
        println!("卡片窗口已存在");
        // 如果存在，直接显示并聚焦
        let _ = card_window.show();
        let _ = card_window.set_always_on_top(true);
        let _ = card_window.set_focus();
    } else {
        println!("卡片窗口不存在");
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis();
        let card_url = format!("message_assistant_card.html?t={}", timestamp);
        // 如果不存在，用 Builder 动态创建
        let card_window = WebviewWindowBuilder::new(
            &app_handle,
            CARD_LABEL,                       // 窗口 Label
            WebviewUrl::App(card_url.into()), // 指向你的 MPA 页面
        )
        .title("桌面卡片")
        .inner_size(300.0, 400.0)
        .resizable(false)
        .decorations(false) // 无边框
        .always_on_top(true) // 顶层显示
        .skip_taskbar(true); // 隐藏任务栏图标
        let _ = card_window.build();
    }
}

#[tauri::command]
pub fn close_message_assistant_card_window(app_handle: AppHandle) {
    if let Some(card_window) = app_handle.get_webview_window(CARD_LABEL) {
        if let Err(e) = card_window.close() {
            println!("隐藏卡片窗口失败: {:?}", e);
        }
    } else {
        println!("卡片窗口不存在");
    }
}

#[tauri::command]
pub fn hide_message_assistant_card_window(app_handle: AppHandle) {
    if let Some(card_window) = app_handle.get_webview_window(CARD_LABEL) {
        if let Err(e) = card_window.hide() {
            println!("隐藏卡片窗口失败: {:?}", e);
        }
    } else {
        println!("卡片窗口不存在");
    }
}
