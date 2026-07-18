import random


ADJECTIVES = [
    "Binary",
    "Quantum",
    "Packet",
    "Kernel",
    "Pixel",
    "Null",
    "Recursive",
    "Static",
    "Dynamic",
    "Virtual",
    "Parallel",
    "Silent",
    "Lucky",
    "Broken",
    "Electric",
]


ANIMALS = [
    "Penguin",
    "Capybara",
    "Otter",
    "Panda",
    "Koala",
    "Sloth",
    "Fox",
    "Raven",
    "Lynx",
    "Octopus",
    "Falcon",
    "Badger",
    "Gecko",
    "Wolf",
    "Mantis",
]


def generate_handle():
    return f"{random.choice(ADJECTIVES)} {random.choice(ANIMALS)}"