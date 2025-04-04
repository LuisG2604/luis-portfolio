// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import prisma from '../prismaClient.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        status: {
          not: "Purchased",
        },
      },
      include: {
        user: { select: { name: true } },
      },
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      project_name: order.project_name,
      project_description: order.project_description,
      project_price: order.project_price,
      status: order.status,
      user_name: order.user ? order.user.name : "Inconnu",
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.orders.update({
      where: { id: Number(id) },
      data: { status: "Completed" },
    });
    res.json({ message: "Commande acceptée avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la commande:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const rejectOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.orders.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Commande rejetée avec succès." });
  } catch (error) {
    console.error("Erreur lors du rejet de la commande:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { project_name, project_description, project_price, user_id } = req.body;

    if (!project_name || !project_description || !project_price || !user_id) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const newOrder = await prisma.orders.create({
      data: {
        project_name,
        project_description,
        project_price: parseFloat(project_price),
        user_id: Number(user_id),
      },
    });

    res.status(201).json({ message: "Commande créée avec succès.", order: newOrder });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const orders = await prisma.orders.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        project_name: true,
        project_description: true,
        project_price: true,
        status: true,
        image: true,
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
