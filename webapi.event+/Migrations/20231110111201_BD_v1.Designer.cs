﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.event_.Contexts;

#nullable disable

namespace webapi.event_.Migrations
{
    [DbContext(typeof(Event_Context))]
    [Migration("20231110111201_BD_v1")]
    partial class BD_v1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("webapi.event_.Domains.ComentariosEvento", b =>
                {
                    b.Property<Guid>("IdComentarioEvento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("VARCHAR(200)");

                    b.Property<bool>("Exibe")
                        .HasColumnType("BIT");

                    b.Property<Guid>("IdEvento")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdUsuario")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("IdComentarioEvento");

                    b.HasIndex("IdEvento");

                    b.HasIndex("IdUsuario");

                    b.ToTable("ComentariosEvento");
                });

            modelBuilder.Entity("webapi.event_.Domains.Evento", b =>
                {
                    b.Property<Guid>("IdEvento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DataEvento")
                        .HasColumnType("DATE");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("IdInstituicao")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdTipoEvento")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("NomeEvento")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.HasKey("IdEvento");

                    b.HasIndex("IdInstituicao");

                    b.HasIndex("IdTipoEvento");

                    b.ToTable("Evento");
                });

            modelBuilder.Entity("webapi.event_.Domains.Instituicao", b =>
                {
                    b.Property<Guid>("IdInstituicao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasMaxLength(14)
                        .HasColumnType("VARCHAR(14)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.Property<string>("NomeFantasia")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.HasKey("IdInstituicao");

                    b.HasIndex("CNPJ")
                        .IsUnique();

                    b.ToTable("Instituicao");
                });

            modelBuilder.Entity("webapi.event_.Domains.PresencasEvento", b =>
                {
                    b.Property<Guid>("IdPresencaEvento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdEvento")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdUsuario")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Situacao")
                        .HasColumnType("BIT");

                    b.HasKey("IdPresencaEvento");

                    b.HasIndex("IdEvento");

                    b.HasIndex("IdUsuario");

                    b.ToTable("PresencasEvento");
                });

            modelBuilder.Entity("webapi.event_.Domains.TiposEvento", b =>
                {
                    b.Property<Guid>("IdTipoEvento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.HasKey("IdTipoEvento");

                    b.ToTable("TiposEvento");
                });

            modelBuilder.Entity("webapi.event_.Domains.TiposUsuario", b =>
                {
                    b.Property<Guid>("IdTipoUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.HasKey("IdTipoUsuario");

                    b.ToTable("TiposUsuario");
                });

            modelBuilder.Entity("webapi.event_.Domains.Usuario", b =>
                {
                    b.Property<Guid>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.Property<Guid>("IdTipoUsuario")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)");

                    b.HasKey("IdUsuario");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("IdTipoUsuario");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("webapi.event_.Domains.ComentariosEvento", b =>
                {
                    b.HasOne("webapi.event_.Domains.Evento", "Evento")
                        .WithMany()
                        .HasForeignKey("IdEvento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.event_.Domains.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Evento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("webapi.event_.Domains.Evento", b =>
                {
                    b.HasOne("webapi.event_.Domains.Instituicao", "Instituicao")
                        .WithMany()
                        .HasForeignKey("IdInstituicao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.event_.Domains.TiposEvento", "TiposEvento")
                        .WithMany()
                        .HasForeignKey("IdTipoEvento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Instituicao");

                    b.Navigation("TiposEvento");
                });

            modelBuilder.Entity("webapi.event_.Domains.PresencasEvento", b =>
                {
                    b.HasOne("webapi.event_.Domains.Evento", "Evento")
                        .WithMany()
                        .HasForeignKey("IdEvento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.event_.Domains.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Evento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("webapi.event_.Domains.Usuario", b =>
                {
                    b.HasOne("webapi.event_.Domains.TiposUsuario", "TipoUsuario")
                        .WithMany()
                        .HasForeignKey("IdTipoUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TipoUsuario");
                });
#pragma warning restore 612, 618
        }
    }
}
