def split_file(input_file, output_prefix, num_files):
    with open(input_file, 'r') as f:
        lines = f.readlines()

    num_lines = len(lines) // num_files

    for i in range(num_files):
        output_file = f"{output_prefix}_{i+1}.txt"
        start_index = i * num_lines
        end_index = start_index + num_lines

        with open(output_file, 'w') as f:
            f.writelines(lines[start_index:end_index])

        print(f"Created {output_file}")

# Sử dụng hàm để chia tệp văn bản thành 10 tệp nhỏ
split_file('chapter2.txt', 'chapter2', 10)
