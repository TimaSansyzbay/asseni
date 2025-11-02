import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Building2, Calendar, CheckCircle2, Clock, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { projects, type Project } from "@/components/projects/projects";

const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

const statusLabels = {
  completed: "Завершен",
  "in-progress": "В процессе",
  planned: "Запланирован",
};

const statusColors = {
  completed: "bg-green-100 text-green-800 hover:bg-green-100",
  "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  planned: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
};

export default function OurWorks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openDetails = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);

  const filteredProjects = sortedProjects.filter((project) => {
    const matchesSearch =
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.workTypes.some((type) => type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filterYear === "all" || project.year.toString() === filterYear;

    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal-in">Наши работы</h1>
          <p className="text-xl text-slate-300 reveal-delay-1 reveal-in">
            Портфолио выполненных проектов строительной компании Asseni
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-4 reveal">
            <div>
              <Input
                placeholder="Поиск по заказчику или виду работ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Все годы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все годы</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Проекты не найдены</h3>
              <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between gap-4 text-slate-600 reveal">
                <div>
                  Найдено проектов: <span className="font-semibold">{filteredProjects.length}</span>
                </div>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(v) => v && setViewMode(v as "grid" | "list")}
                  spacing={0}
                  variant="outline"
                  size="sm"
                >
                  <ToggleGroupItem value="grid" aria-label="Вид сеткой">
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="Вид списком">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="hover:shadow-lg transition-shadow border-none shadow-md reveal cursor-pointer"
                      onClick={() => openDetails(project)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={statusColors[project.status]}>
                            {project.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {project.status === "in-progress" && <Clock className="w-3 h-3 mr-1" />}
                            {project.status === "planned" && <Calendar className="w-3 h-3 mr-1" />}
                            {statusLabels[project.status]}
                          </Badge>
                          <Badge variant="outline" className="ml-2">
                            {project.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">{project.client}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-700 mb-2">Виды работ:</div>
                          <div className="flex flex-wrap gap-2">
                            {project.workTypes.map((type, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="reveal">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Наименование заказчика</TableHead>
                        <TableHead>Виды работ</TableHead>
                        <TableHead>Год</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id} className="cursor-pointer" onClick={() => openDetails(project)}>
                          <TableCell className="font-medium">{project.client}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {project.workTypes.map((type, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{project.year}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[project.status]}>
                              {project.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {project.status === "in-progress" && <Clock className="w-3 h-3 mr-1" />}
                              {project.status === "planned" && <Calendar className="w-3 h-3 mr-1" />}
                              {statusLabels[project.status]}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 reveal">Статистика проектов</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 reveal">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-lg text-slate-600">Завершенных проектов</div>
            </div>
            <div className="p-6 reveal reveal-delay-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {projects.filter((p) => p.status === "in-progress").length}
              </div>
              <div className="text-lg text-slate-600">Проектов в работе</div>
            </div>
            <div className="p-6 reveal reveal-delay-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {projects.filter((p) => p.status === "planned").length}
              </div>
              <div className="text-lg text-slate-600">Запланированных проектов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.client}</DialogTitle>
                <DialogDescription>
                  {statusLabels[selectedProject.status]} • {selectedProject.year}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-1">Виды работ</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.workTypes.map((type, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">{selectedProject.description}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
