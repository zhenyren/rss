fn main() {
    // 确保 OUT_DIR 环境变量存在
    // 这个变量通常由 Cargo 在构建时自动设置
    // 但在某些 IDE (如 VS Code) 的 Rust Analyzer 中可能会缺失
    if std::env::var("OUT_DIR").is_err() {
        // 如果 OUT_DIR 未设置，使用 target 目录作为回退
        let manifest_dir = std::env::var("CARGO_MANIFEST_DIR")
            .expect("CARGO_MANIFEST_DIR should be set");
        let out_dir = std::path::PathBuf::from(&manifest_dir)
            .join("target")
            .join("out");
        std::fs::create_dir_all(&out_dir).ok();
        std::env::set_var("OUT_DIR", out_dir.to_string_lossy().to_string());
    }
    
    tauri_build::build()
}
