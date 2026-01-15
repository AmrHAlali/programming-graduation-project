import { screenMap } from "../sample-apps"

import main from "../sample-apps/main.json"
import screen1 from "../sample-apps/screen1.json"
import screen2 from "../sample-apps/screen2.json"
import screen3 from "../sample-apps/screen3.json"

const localFiles: Record<string, any> = {
  main,
  screen1,
  screen2,
  screen3
}

export async function fetchScreen(screenId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const screen = screenMap[screenId]
  if (!screen) {
    console.warn("⚠️ Screen not found:", screenId)
    return null
  }
  return screen
}

export async function fetchMainApp(source: string) {
  // 🟢 Local simulation
  if (source.startsWith("local:")) {
    const fileName = source.replace("local:", "")
    const json = localFiles[fileName]
    if (!json) {
      throw new Error(`❌ Local file not found: ${fileName}`)
    }
    return json
  }

  // 🟢 Remote backend mode
  const response = await fetch(source)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return await response.json()
}
