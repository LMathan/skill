import fs from "fs"
import path from "path"

export interface ApkInfo {
  fileName: string
  version: string
}

export function getLatestApkInfo(): ApkInfo {
  const defaultInfo: ApkInfo = {
    fileName: "ActivePulse-v1.2.0.apk",
    version: "v1.2.0"
  }

  try {
    const dirPath = path.join(process.cwd(), "public", "Product")
    if (!fs.existsSync(dirPath)) {
      return defaultInfo
    }

    const files = fs.readdirSync(dirPath)
    // Find all files ending with .apk
    const apkFiles = files.filter(file => file.toLowerCase().endsWith(".apk"))

    if (apkFiles.length === 0) {
      return defaultInfo
    }

    // Sort files to find the latest version
    const parsedFiles = apkFiles.map(fileName => {
      // Extract version: e.g. v1.2.0 or 1.2.0 from "ActivePulse-v1.2.0.apk"
      const match = fileName.match(/ActivePulse-v?(\d+(?:\.\d+)*)/i)
      const versionStr = match ? match[1] : "0.0.0"
      
      // Convert "1.2.0" to numeric array [1, 2, 0] for robust comparison
      const versionParts = versionStr.split(".").map(num => parseInt(num, 10) || 0)

      return {
        fileName,
        versionStr: match ? `v${versionStr}` : "v1.0.0", // format as vX.Y.Z
        versionParts
      }
    })

    // Sort descending by version parts
    parsedFiles.sort((a, b) => {
      const maxLength = Math.max(a.versionParts.length, b.versionParts.length)
      for (let i = 0; i < maxLength; i++) {
        const valA = a.versionParts[i] || 0
        const valB = b.versionParts[i] || 0
        if (valA !== valB) {
          return valB - valA // Descending order
        }
      }
      return b.fileName.localeCompare(a.fileName)
    })

    const latest = parsedFiles[0]
    return {
      fileName: latest.fileName,
      version: latest.versionStr
    }
  } catch (error) {
    console.error("Error reading APK directory:", error)
    return defaultInfo
  }
}
