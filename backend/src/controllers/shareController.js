const crypto = require("crypto");

// Armazenamento em memória
const sharedListsDB = new Map();

// Criar link de compartilhamento
exports.createShareLink = (req, res) => {
  try {
    const { userId, favorites } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    if (!favorites || favorites.length === 0) {
      return res.status(400).json({ error: "No favorites to share" });
    }

    // Gerar ID único para o compartilhamento
    const shareId = crypto.randomBytes(16).toString("hex");

    // Salvar lista compartilhada com timestamp de expiração (7 dias)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    sharedListsDB.set(shareId, {
      favorites,
      userId,
      createdAt: Date.now(),
      expiresAt,
    });

    const shareUrl = `${req.protocol}://${req.get("host")}/shared/${shareId}`;

    res.json({
      shareId,
      shareUrl,
      expiresAt,
    });
  } catch (error) {
    console.error("Error creating share link:", error.message);
    res.status(500).json({ error: "Failed to create share link" });
  }
};

// Obter lista compartilhada
exports.getSharedList = (req, res) => {
  try {
    const { shareId } = req.params;
    const sharedList = sharedListsDB.get(shareId);

    if (!sharedList) {
      return res.status(404).json({ error: "Shared list not found" });
    }

    // Verificar se expirou
    if (Date.now() > sharedList.expiresAt) {
      sharedListsDB.delete(shareId);
      return res.status(410).json({ error: "Shared list has expired" });
    }

    res.json({
      favorites: sharedList.favorites,
      createdAt: sharedList.createdAt,
      expiresAt: sharedList.expiresAt,
    });
  } catch (error) {
    console.error("Error fetching shared list:", error.message);
    res.status(500).json({ error: "Failed to fetch shared list" });
  }
};
