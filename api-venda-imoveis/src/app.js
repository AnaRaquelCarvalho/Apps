/**
 * ==========================================
 * 🔹 ATUALIZAR IMÓVEL
 * ==========================================
 */

app.put(
  "/imoveis/:id",
  authMiddleware,
  async (req, res) => {

    try {

      /**
       * 🔹 VALIDAR DADOS
       */
      const { error } =
        propertySchema.validate(
          req.body
        );

      if (error) {
        return res.status(400).json({
          error:
            error.details[0].message,
        });
      }

      /**
       * 🔹 BUSCAR IMÓVEL
       */
      const property =
        await Property.findByPk(
          req.params.id
        );

      if (!property) {
        return res.status(404).json({
          error:
            "Imóvel não encontrado",
        });
      }

      /**
       * 🔹 ATUALIZAR IMÓVEL
       */
      await property.update(
        req.body
      );

      /**
       * 🔹 RETORNO
       */
      res.status(200).json(
        property
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error:
          "Erro ao atualizar imóvel",
      });
    }
  }
);