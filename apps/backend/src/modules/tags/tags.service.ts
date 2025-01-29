import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../infra/database/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async findExistingTags(tags: string[]): Promise<Tag[]> {
    if (!tags?.length) return [];

    return this.tagRepository.find({
      where: tags.map((text) => ({ text: text.toLowerCase() })),
    });
  }

  async create(tags: string[]): Promise<Tag[]> {
    if (!tags?.length) return [];

    const sanitizedTags = tags.map((tag) => tag.toLowerCase());
    const existingTags = await this.findExistingTags(sanitizedTags);
    const existingTagTexts = new Set(existingTags.map((tag) => tag.text));

    // Identify new tags that don’t exist yet
    const newTags = sanitizedTags
      .filter((text) => !existingTagTexts.has(text))
      .map((text) => this.tagRepository.create({ text }));

    // Save only if there are new tags
    if (newTags.length) {
      await this.tagRepository.save(newTags);
      return [...existingTags, ...newTags];
    }

    return existingTags;
  }
}
