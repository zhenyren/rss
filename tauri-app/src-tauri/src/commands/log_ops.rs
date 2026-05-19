#[tauri::command]
pub fn log(msg: &str) {
    println!("{}", msg);
}
