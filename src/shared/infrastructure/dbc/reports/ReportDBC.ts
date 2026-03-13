import { readFileSync, writeFileSync, existsSync } from 'fs'
import JsonReportProvider from './ReportProvider'

export default class JsonReportDBC {
  private static instance: JsonReportDBC
  private readonly provider: JsonReportProvider

  private constructor() {
    this.provider = new JsonReportProvider()
  }

  static readonly getInstance = (): JsonReportDBC => {
    JsonReportDBC.instance = this.instance ?? new JsonReportDBC()
    return JsonReportDBC.instance
  }

  private loadData = (): any[] => {
    const path = this.provider.PATH()
    if (!existsSync(path)) {
      writeFileSync(path, JSON.stringify([]), 'utf-8')
    }
    const content = readFileSync(path, 'utf-8')
    return JSON.parse(content || '[]')
  }

  private saveData = (data: any[]): void => {
    const path = this.provider.PATH()
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8')
  }

  readonly saveReport = (report: any): void => {
    const data = this.loadData()

    const index = data.findIndex(r => r.fechaReporte === report.fechaReporte)
    if (index !== -1) {
      data[index].movimientos = [
        ...data[index].movimientos,
        ...report.movimientos,
      ]
    } else {
      data.push(report)
    }

    this.saveData(data)
  }

  readonly getReportsByDate = (fecha: string): any[] => {
    const data = this.loadData()
    return data.filter(r => r.fechaReporte === fecha)
  }
}
