import { Request, Response } from "express";
import { CompanyService } from "../services/companyServices";

const companyService = new CompanyService();

export const createCompany = async (req: Request, res: Response) => {
  const { name, domain } = req.body;
  try {
    const company = await companyService.createCompany(name, domain);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCompanies = async (_: Request, res: Response) => {
  try {
    const companies = await companyService.findAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const company = await companyService.updateCompany(id, name);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await companyService.deleteCompany(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
