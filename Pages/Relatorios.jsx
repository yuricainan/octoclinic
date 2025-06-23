import React, { useState } from "react";
import { RegistroFalta } from "@/entities/RegistroFalta";
import { Ocorrencia } from "@/entities/Ocorrencia";
import { Plantao } from "@/entities/Plantao";
import { Funcionario } from "@/entities/Funcionario";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";

export default function Relatorios() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!reportType || !startDate || !endDate) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setIsLoading(true);

    let data;
    let headers;
    let filename;
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    switch (reportType) {
      case "faltas":
        const faltas = await RegistroFalta.filter({ created_date: { $gte: start, $lte: end } });
        const funcionarios = await Funcionario.list();
        const funcMap = funcionarios.reduce((acc, f) => ({ ...acc, [f.id]: f.nome_completo }), {});
        
        headers = ["ID", "Funcionário", "Data", "Tipo", "Motivo", "Status"];
        data = faltas.map(f => [f.id, funcMap[f.funcionario_id], f.data_falta, f.tipo, f.motivo, f.status]);
        filename = `relatorio_faltas_${startDate}_a_${endDate}.csv`;
        break;
      
      case "ocorrencias":
        const ocorrencias = await Ocorrencia.filter({ data_ocorrencia: { $gte: start, $lte: end } });
        headers = ["ID", "Título", "Tipo", "Setor", "Data", "Gravidade", "Status"];
        data = ocorrencias.map(o => [o.id, o.titulo, o.tipo, o.setor, o.data_ocorrencia, o.gravidade, o.status]);
        filename = `relatorio_ocorrencias_${startDate}_a_${endDate}.csv`;
        break;
      
      // Add more cases for other reports
      default:
        setIsLoading(false);
        return;
    }

    generateCsv(headers, data, filename);
    setIsLoading(false);
  };

  const generateCsv = (headers, data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + data.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Relatórios Gerenciais</h1>
          <p className="text-sm lg:text-base text-slate-600">Gere e exporte relatórios customizados para análise.</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
              <FileText className="w-5 h-5 text-blue-600" />
              Gerador de Relatórios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6 p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faltas">Relatório de Faltas</SelectItem>
                    <SelectItem value="ocorrencias">Relatório de Ocorrências</SelectItem>
                    <SelectItem value="horas" disabled>Horas por Funcionário (em breve)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Fim</Label>
                <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            {/* Add more filter options here later */}
            <div className="pt-4 border-t">
              <Button onClick={handleGenerateReport} disabled={isLoading || !reportType} className="w-full lg:w-auto">
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? "Gerando..." : "Gerar e Baixar Relatório"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}