// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import prisma from '../prismaClient.js';

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connecte avec la DB");
  } catch (error) {
    console.error("❌ Erreur de connection avec la DB", error);
  }
}

testDB();

export const publishProject = async (req, res) => {
  const { title, category, price, description } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "L'image du projet est requise." });
    }
    const imageName = req.file.filename;
    const newProject = await prisma.projects.create({
      data: {
        title,
        category,
        description,
        price: parseFloat(price),
        image: imageName,
      }
    });

    res.status(201).json({ message: "Projet publié avec succès.", project: newProject });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la publication du projet." });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.projects.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets.", error);
    res.status(500).json({ message: "Erreur lors de la récupération des projets." });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedProject = await prisma.projects.update({
      where: { id: parseInt(id) },
      data: { title, description, price: parseFloat(price) },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet." });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.projects.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }

    await prisma.projects.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Projet supprimé avec succès!" });

  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du projet." });
  }
};
