#[tauri::command]
#[allow(deprecated)]
async fn open_url(url: String, app: tauri::AppHandle) -> Result<(), String> {
    tauri_plugin_shell::ShellExt::shell(&app)
        .open(&url, None)
        .map_err(|e| format!("Failed to open URL: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![open_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
